import {
  relayInit,
  generatePrivateKey,
  getPublicKey,
  getEventHash,
  getSignature,
} from "nostr-tools";

// Hardcoding for now until we get everything working and then we will switch to browser extension signed events.

let sk = generatePrivateKey(); // `sk` is a hex string
let pk = getPublicKey(sk); // `pk` is a hex string

export const connectToRelay = async () => {
  const relay = relayInit("ws://localhost:7002/");
  await relay.connect();

  relay.on("connect", () => {
    console.log(`connected to ${relay.url}`);
  });
  relay.on("error", () => {
    console.log(`failed to connect to ${relay.url}`);
  });

  return relay;
};

export const publishEvent = async (event) => {
  const relay = await connectToRelay();

  let pub = relay.publish(event);
  pub.on("ok", () => {
    console.log(`${relay.url} has accepted our event`);
    return true;
  });
  pub.on("failed", (reason) => {
    console.log(`failed to publish to ${relay.url}: ${reason}`);
    return false;
  });
};

export const closeConnectionToRelay = async (relay) => {
  await relay.close();
};

// Forums
export let createForum = async ({ title, description, name, phone, email }) => {
  console.log("Creating forum");

  let event = {
    pubkey: pk,
    created_at: Math.floor(Date.now() / 1000),
    kind: 1,
    tags: [
      ["title", title],
      ["description", description],
      ["name", name],
      ["phone", phone],
      ["f", email, "forumstr.lol"],
    ],
    content: "",
  };

  event.id = getEventHash(event);
  event.sig = getSignature(event, sk);
  console.log("Publishing event");
  await publishEvent(event);
  console.log("Event published");

  return event.id;
};

export const getForumDetail = async (forumId) => {
  const relay = await connectToRelay();

  let event = await relay.get({
    ids: [forumId],
  });

  await closeConnectionToRelay(relay);

  let forumDetail = {
    title: event.tags[0][1],
    description: event.tags[1][1],
    name: event.tags[2][1],
    phone: event.tags[3][1],
    email: event.tags[4][1],
  };

  return forumDetail;
};

// Threads
export let createThread = async ({ forumId, title, description, name, phone, email }) => {
  let event = {
    pubkey: pk,
    created_at: Math.floor(Date.now() / 1000),
    kind: 11,
    tags: [
      ["e", forumId],
      ["title", title],
      ["description", description],
      ["name", name],
      ["phone", phone],
      ["email", email],
    ],
    content: content,
  };

  event.id = getEventHash(event);
  event.sig = getSignature(event, sk);
  await publishEvent(event);

  return event.id;
};

export const getThreadDetail = async (threadId) => {
  const relay = await connectToRelay();

  let event = await relay.get({
    ids: [threadId],
  });

  await closeConnectionToRelay(relay);

  let threadDetail = {
    title: event.tags[1][1],
    description: event.tags[2][1],
    name: event.tags[3][1],
    phone: event.tags[4][1],
    email: event.tags[5][1],
    content: event.content,
    author: event.pubkey,
  };

  return threadDetail;
};

// Comments
export let createComment = async ({ threadId, name, content }) => {
  let event = {
    pubkey: pk,
    created_at: Math.floor(Date.now() / 1000),
    kind: 12,
    tags: [["e", threadId]],
    name: name,
    content: content,
  };

  event.id = getEventHash(event);
  event.sig = getSignature(event, sk);
  await publishEvent(event);

  return event.id;
};
