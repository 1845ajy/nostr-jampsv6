"use client";

import { connectToRelay } from "@/utils/nostr";
import Thread from "./Thread";
import { useEffect, useState } from "react";

const ThreadList = async ({ forumId }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    async function getThreads() {
      const relay = await connectToRelay();
      // let query = { kinds: [11], "#e": [forumId] };
      let query = { kinds: [11], "#e": [forumId] };
      let sub = relay.sub([query]);
      sub.on("event", (event) => {
        if (
          event.tags[1][0] === "title" &&
          event.tags[2][0] === "description",
          event.tags[3][0] === "name",
          event.tags[4][0] === "phone",
          event.tags[5][0] === "email"
        ) {
          let threadList = [...threads, event];
          setThreads(threadList);
          threads.push(event);
        }
      });
      sub.on("eose", () => {
        sub.unsub();
        closeConnectionToRelay(relay);
      });
    }
    getThreads();
  }, []);
  return (
    <div className="row">
      {threads ? (
        threads.map((thread) => {
          console.log("Thread in the map function: ", thread);
          return (
            <Thread
              forumId={forumId}
              threadId={thread.id}
              subject={thread.tags[1][1]}
              description={thread.tags[2][1]}
              name={thread.tags[3][1]}
              phone={thread.tags[4][1]}
              email={thread.tags[5][1]}
              key={thread.id}
            />
          );
        })
      ) : (
        <p>No threads found... </p>
      )}
    </div>
  );
};

export default ThreadList;
