import cookie from "cookie";

export default async function handler(req, res) {
  // LOGIN:
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("pizzaToken", process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json("Successfully!");
    } else {
      res.status(400).json("Wrong credentials!");
    }
  }
}
