import { AppBskyFeedDefs, AppBskyFeedPost, AtpAgentLoginOpts } from "@atproto/api";

import { agent } from "~/lib/api";
import { loginCredentials } from "~/secrets/login";

const EXAMPLE_POST =
  "at://did:plc:vwzwgnygau7ed7b7wt5ux7y2/app.bsky.feed.post/3karfx5vrvv23";

export default async function Homepage() {
  await agent.login(loginCredentials)
  
  const accountLogin = 'ryanbonick.com'

  const { data: profileData } = await agent.app.bsky.actor.getProfile({ actor: accountLogin })
  const { data: { feed } } = await agent.app.bsky.feed.getAuthorFeed({ actor: accountLogin })
  const filteredFeed = feed.filter((post) => AppBskyFeedPost.isRecord(post.record))

  return (
    <div>
      <div>
        <b>{profileData.displayName} - {profileData.handle}</b>
      </div>
      <div>
        {feed.map(({ post }) => (
          <div>
            <p>{post.author.displayName}</p>
            <p>{post.record.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}