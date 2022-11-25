# The Publish-Subscribe Pattern

The publish-subscribe (or pub/sub) messaging pattern is a design pattern that provides a framework for exchanging messages that allows for loose coupling and scaling between the sender of messages (publishers) and receivers (subscribers) on topics they subscribe to.

Messages are sent (pushed) from a publisher to subscribers as they become available. The host (publisher) publishes messages (events) to channels (topics). Subscribers can sign up for the topics they are interested in.

This is different from the standard request/response (pull) models in which publishers check if new data has become available. This makes the pub/sub method the most suitable framework for streaming data in real-time.

It also means that dynamic networks can be built at internet scale. However, building a messaging infrastructure at such a scale can be problematic.

This introduction to the pub/sub messaging pattern describes what it is, and why developers use it, and discusses the difficulties that must be overcome when building a messaging system at scale.

[Example](./publish-subscribe.ts)


