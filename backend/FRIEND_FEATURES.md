# Friend Request Features

This document details the friend request functionality implemented in NOCTIS.

## Endpoints

### Send Friend Request
- **Route:** `POST /api/friends/request/send`
- **Auth:** Required (authenticateToken)
- **Controller:** `sendFriendRequest` in `friendController.js` (Line 7)
- **Features:**
  - Validates sender and receiver exist
  - Prevents self-friend requests
  - Checks for duplicate pending requests
  - Prevents requests if already friends
  - Creates notification for receiver
  - Returns 201 on success

### Accept Friend Request
- **Route:** `PUT /api/friends/request/:requestId/accept`
- **Auth:** Required (authenticateToken)
- **Controller:** `acceptFriendRequest` in `friendController.js` (Line 83)
- **Features:**
  - Validates authorization (receiver only)
  - Updates request status to "accepted"
  - Increments friend count for both users
  - Creates notification for sender
  - Returns updated friend request

### Remove Friend
- **Route:** `DELETE /api/friends/:friendId`
- **Auth:** Required (authenticateToken)
- **Controller:** `removeFriend` in `friendController.js` (Line 182)
- **Features:**
  - Prevents self-removal
  - Removes friendship in either direction
  - Handles bidirectional storage
  - Returns success message with deleted friendship

## Database Model

**Model:** `FriendRequestModel.js`
- Fields: senderId, receiverId, status (pending/accepted/rejected)
- Relationships: References User model
- Indexes: Used for efficient queries

## Additional Features

- `getPendingRequests` - Get all pending requests for a user
- `getFriendshipStatus` - Check relationship status between two users
- `getUserFriends` - Get complete friends list
- `rejectFriendRequest` - Reject pending requests

All friend request operations are real-time and trigger notifications.
