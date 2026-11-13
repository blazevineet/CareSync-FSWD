package com.caresync.userservice;

// Only the data the API is allowed to return - the password hash is never included.
public record UserResponse(Long id, String name, String email) {

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail());
    }
}
