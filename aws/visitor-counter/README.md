# RBIL Visitor Counter Backend

This backend stores the public landing-page visit count in DynamoDB and exposes a secure API through API Gateway and Lambda. It does not use EC2.

## Deploy

From this folder:

```powershell
sam build
sam deploy --guided --parameter-overrides AllowedOrigins="https://rbil.in,https://www.rbil.in" RateLimitSalt="replace-with-a-long-random-secret"
```

After deployment, copy the `VisitorCounterEndpoint` output into AWS Amplify Hosting as:

```text
VITE_VISITOR_COUNTER_ENDPOINT=https://your-api-id.execute-api.your-region.amazonaws.com/prod/visit
```

Then redeploy the `main` branch in Amplify so the static frontend receives the endpoint at build time.

## Production Test

Open the production website once, note the displayed count, then refresh the page 10 times manually in the browser. The displayed count should increase by exactly 10 unless the rate limit has been set too low or a bot/prefetch header is being sent by the test client.

## Controls

- POST `/visit` increments the counter once per actual page load.
- GET `/visit` returns the current count without incrementing.
- DynamoDB `UpdateItem` uses an atomic `ADD totalVisits :one` update.
- Crawlers, preview user agents, prefetch and prerender headers are skipped where reasonably detectable.
- Rate-limit state is stored in DynamoDB with TTL and does not deduplicate normal repeat visits.
