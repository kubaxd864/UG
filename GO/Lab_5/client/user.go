package client

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

func (c *Client) GetUser(ctx context.Context, id int) (*User, error) {
    url := fmt.Sprintf("%s/user/%d", c.baseURL, id)

    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
    if err != nil {
        return nil, err
    }

    resp, err := c.httpClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if err := checkStatus(resp); err != nil {
        return nil, err
    }

    var u User
    if err := json.NewDecoder(resp.Body).Decode(&u); err != nil {
        return nil, err
    }

    return &u, nil
}

func (c *Client) CreateUser(ctx context.Context, u User) (*User, error) {
    body, err := json.Marshal(u)
    if err != nil {
        return nil, err
    }

    req, err := http.NewRequestWithContext(
        ctx,
        http.MethodPost,
        c.baseURL+"/user",
        bytes.NewBuffer(body),
    )
    if err != nil {
        return nil, err
    }

    req.Header.Set("Content-Type", "application/json")

    resp, err := c.httpClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if err := checkStatus(resp); err != nil {
        return nil, err
    }

    var created User
    if err := json.NewDecoder(resp.Body).Decode(&created); err != nil {
        return nil, err
    }

    return &created, nil
}