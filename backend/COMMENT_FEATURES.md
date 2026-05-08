# Comment Features

This document details the comment functionality implemented in NOCTIS.

## Endpoints

### Get Post Comments
- **Route:** `GET /api/comments/post/:postId`
- **Auth:** Not required
- **Controller:** `getPostComments` in `commentController.js` (Line 6)
- **Features:**
  - Fetches all comments for a specific post
  - Populates user information (username, _id)
  - Returns comments sorted by creation date (newest first)
  - Returns 200 with comments array

### Add Comment
- **Route:** `POST /api/comments`
- **Auth:** Required (authMiddleware)
- **Controller:** `addComment` in `commentController.js` (Line 23)
- **Features:**
  - Creates new comment on a post
  - Validates userId, postId, and content are provided
  - Checks if post exists before adding comment
  - Trims content for consistency
  - Populates user information in response
  - Creates notification for post owner
  - Returns 201 on success

### Update Comment
- **Route:** `PUT /api/comments/:commentId`
- **Auth:** Required (authMiddleware)
- **Controller:** `updateComment` in `commentController.js` (Line 100)
- **Features:**
  - Allows comment owner to edit their comment
  - Validates ownership before updating
  - Updates comment content
  - Returns updated comment with user info
  - Includes proper error handling

### Delete Comment
- **Route:** `DELETE /api/comments/:commentId`
- **Auth:** Required (authMiddleware)
- **Controller:** `deleteComment` in `commentController.js` (Line 72)
- **Features:**
  - Allows comment owner or post owner to delete comment
  - Validates authorization before deletion
  - Removes comment from database
  - Returns success message with deleted comment data
  - Includes proper error handling

### Get Comment Count
- **Route:** `GET /api/comments/post/:postId/count`
- **Auth:** Not required
- **Controller:** `getCommentCount` in `commentController.js` (Line 138)
- **Features:**
  - Returns count of comments for a specific post
  - Used for displaying comment statistics
  - Returns count in response

## Database Model

**Model:** `CommentModel.js`
- Fields: postId, userId, content, createdAt, updatedAt
- Relationships: References Post and User models
- Indexes: Used for efficient queries by postId

## Real-time Features

- Comments trigger notifications to post owners
- Comments are fetched in real-time order
- Comment counts updated dynamically
- User information populated with each comment

## Authentication & Authorization

- Add, Update, Delete operations require authentication
- Users can only update/delete their own comments (or post owners can delete)
- Get operations are public
