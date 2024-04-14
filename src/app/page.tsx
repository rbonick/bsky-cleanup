import { AppBskyFeedDefs, AppBskyFeedPost, AtpAgentLoginOpts } from "@atproto/api";

import { agent } from "~/lib/api";
import { loginCredentials } from "~/secrets/login";
import { Post } from "./components/post";

export default async function Homepage() {
  await agent.login(loginCredentials)

  const accountLogin = 'ryanbonick.com'

  const { data: profileData } = await agent.app.bsky.actor.getProfile({ actor: accountLogin })
  const { data: { feed } } = await agent.app.bsky.feed.getAuthorFeed({ actor: accountLogin })
  const filteredFeed = feed.filter((post) => AppBskyFeedPost.isRecord(post.record))
  const isRecords = feed.map(({ post }) => AppBskyFeedPost.isRecord(post.record))

  return (
    <div className="container mx-auto max-w-xl">
      <div>
        <b>{profileData.displayName} - {profileData.handle}</b>
      </div>

      <div className="flex flex-col space-y-4">
        {feed.map(({ post }) => (
          <Post post={post}/>
        ))}
      </div>
    </div>
  );
}