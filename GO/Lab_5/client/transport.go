package client

import "net/http"

type transport struct {
    base http.RoundTripper
    ua   string
}

func (t *transport) RoundTrip(req *http.Request) (*http.Response, error) {
    req.Header.Set("User-Agent", t.ua)
    return t.base.RoundTrip(req)
}