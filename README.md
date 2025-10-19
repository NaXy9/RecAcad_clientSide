## Overview

The RekAcad client provides the user interface through which instructors and students interact with the RekAcad service. It allows users to authenticate, initiate recording sessions, monitor recording status, and explore processed lecture artifacts such as transcripts, summaries, notes and timestamped highlights.

## Purpose

This repository contains all client‑side sources and assets required to:

- Authenticate users and obtain authorization tokens for API access.
- Create and manage recording sessions (start/stop, select group, supply conference link).
- Display a list of recordings with statuses and metadata.
- Present detailed views of a recording: embedded video player, transcript viewer, time‑indexed summary, and lecture notes.
- Manage group membership and permissions (group creation, invitations and membership management through API calls).

## How it works (high level flow)

1. The user logs in to the client and receives an authorization token from the backend.
2. To start a session the user fills a simple form (conference link, optional metadata, target group) and submits it to the backend API.
3. The client shows an immediate session status and subscribes to updates (polling or WebSocket) to reflect lifecycle changes (queued, recording, processing, ready).
4. When processing is complete, the client loads transcripts, summaries and notes from the backend and renders them alongside the video player with synchronized timestamps.
5. Users may download artifacts or share access links according to permissions granted by the backend.

## Deployment considerations

- Because the client and backend are separate repositories, the client should allow the API base URL and authentication settings to be configured at build or runtime.
- The client must handle token refresh and error cases gracefully and present clear status information for long‑running tasks.

