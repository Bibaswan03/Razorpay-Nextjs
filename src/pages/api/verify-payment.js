import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { order_id, payment_id, signature } = req.body;

    const body = `${order_id}|${payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === signature) {
      res.status(200).json({ status: 'success' });
    } else {
      res.status(400).json({ status: 'failure' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
