import * as Sentry from "@sentry/react-native"

type SentrySpanName = 
  "current-song"|
  "user-profile"|
  "current-user"| "user/:id" |
  "genres"| "genres/:id" |
  "tracks"| "tracks/:id" |
  "artists"| "artists/:id" |
  "similar-users"

export async function createSentrySpan(name: SentrySpanName, request: () => any) {
  const result = await Sentry.startSpan({ name, op: "http" },
      async () => {
        return request()
      },
  );

  return result
}