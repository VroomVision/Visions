import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema, insertSubscriberSchema } from "@shared/schema";
import { createRazorpayOrder } from "./razorpay";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/products", async (_req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/reviews", async (_req: Request, res: Response) => {
    try {
      const reviews = await storage.getAllReviews();
      return res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      return res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      return res.status(400).json({ message: "Invalid review data" });
    }
  });

  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(validatedData);
      return res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
      console.error("Error creating subscriber:", error);
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string" &&
        ((error as { message: string }).message.includes("unique"))
      ) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      return res.status(400).json({ message: "Invalid subscriber data" });
    }
  });

  app.post("/api/razorpay/order", async (req: Request, res: Response) => {
    try {
      const { amount, currency, receipt, email } = req.body;
      if (!amount || !currency || !receipt || !email) {
        return res.status(400).json({ message: "Missing required order details" });
      }

      // Assuming amount is in USD cents from the client
      // Convert USD cents to INR paise (Example: 1 USD = 83 INR)
      const usdAmount = amount / 100; // Convert cents to dollars
      const inrAmount = usdAmount * 83; // Convert dollars to rupees
      const inrPaise = Math.round(inrAmount * 100); // Convert rupees to paise

      // Ensure currency is set to INR for Razorpay
      if (currency !== "INR") {
           console.warn(`Unexpected currency received: ${currency}. Proceeding with INR.`);
      }

      // Pass email to createRazorpayOrder for notes
      const order = await createRazorpayOrder(inrPaise, "INR", receipt, email);
      // In a real application, you would save the order details to your database here
      return res.status(201).json({ id: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return res.status(500).json({ message: "Failed to create Razorpay order" });
    }
  });

  app.get('/download/instagram-guide', (req: Request, res: Response) => {
    // TODO: Implement logic here to verify if the user is authorized to download the file
    // For example, check if the user has a session indicating a successful purchase.

    const filePath = path.join(__dirname, '../private_assets/Instagram_Export_Guide.zip');

    // Ensure the file exists before attempting to send it
    if (fs.existsSync(filePath)) {
      res.download(filePath, 'Instagram Export Guide.zip', (err) => {
        if (err) {
          console.error('Error sending file:', err);
          // Handle error, maybe file not found or permission issue
          res.status(500).send('Could not download the file.');
        } else {
          // Log the successful download
          console.log('Instagram Export Guide downloaded successfully.');
          // TODO: Add more sophisticated tracking here, e.g., save to database
        }
      });
    } else {
      console.error('File not found:', filePath);
      res.status(404).send('File not found.');
    }
  });

  app.get('/download/zip/:filename', (req: Request, res: Response) => {
    // Sanitize filename to prevent directory traversal
    const filename = path.basename(req.params.filename);
    const filePath = path.join(__dirname, '../public/downloads/', filename);

    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      console.log(`Preparing to send: ${filePath} (${stat.size} bytes)`);
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Transfer-Encoding', 'binary');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Length', stat.size);
      res.status(200);

      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      fileStream.on('end', () => {
        console.log(`${filename} downloaded successfully.`);
      });

      fileStream.on('error', (err: any) => {
        console.error('Error streaming file:', err);
        if (!res.headersSent) {
          res.status(500).send('Could not download the file.');
        }
      });
    } else {
      console.error('File not found: ' + filePath);
      res.status(404).send('File not found.');
    }
  });

  // Return the HTTP server instance
  return createServer(app);
}
