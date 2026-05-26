package client

import (
	"fmt"
	"net/http"
	"time"
)

type Client struct {
    httpClient *http.Client
    baseURL    string
}

func NewClient(baseURL string) *Client {
    return &Client{
        baseURL: baseURL,
        httpClient: &http.Client{
            Timeout: 10 * time.Second,
            Transport: &transport{
                base: http.DefaultTransport,
                ua:   "MyGoClient/1.0",
            },
        },
    }
}

func checkStatus(resp *http.Response) error {
    if resp.StatusCode < 200 || resp.StatusCode >= 300 {
        return fmt.Errorf("http error: %s", resp.Status)
    }
    return nil
}