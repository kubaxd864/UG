package client_test

import (
	"context"
	"fmt"
	"main/Lab_5/client"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetUser(t *testing.T) {
    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        if r.Header.Get("User-Agent") == "" {
            t.Fatal("missing user agent")
        }

        w.Header().Set("Content-Type", "application/json")
        fmt.Fprint(w, `{"id":1,"name":"Jan"}`)
    }))
    defer server.Close()

    c := client.NewClient(server.URL)

    u, err := c.GetUser(context.Background(), 1)
    if err != nil {
        t.Fatal(err)
    }

    if u.Name != "Jan" {
        t.Fatalf("expected Jan, got %s", u.Name)
    }
}