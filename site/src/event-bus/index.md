---
layout: main.njk
title: FicusJS documentation - Event bus
---
# Event bus

FicusJS provides a function for creating a fast, lightweight publish/subscribe event bus.

For communication between components without triggering a re-render, the event bus object provides a topic-based publish/subscribe API.

**The event bus will be created as a singleton - this ensures only one instance exists.**
