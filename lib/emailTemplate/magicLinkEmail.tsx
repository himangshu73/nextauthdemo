export default function MagicLinkEmail({
  url,
  email,
}: {
  url: string;
  email: string;
}) {
  return (
    <div>
      <h1>Sign into your app</h1>
      <p>Hi {email},</p>
      <p>
        Click the link below to sign in:
        <br />
        <a href={url}>Click Here To Login</a>
      </p>
      <p>This link will expire in 10 minutes.</p>
    </div>
  );
}
