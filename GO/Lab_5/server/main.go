package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"main/Lab_5/client"
)

type userStore struct {
    byID map[int]client.User
}

func newUserStore() *userStore {
    return &userStore{
        byID: map[int]client.User{
            1: {ID: 1, Name: "Jan"},
        },
    }
}

func (s *userStore) handleUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    switch r.Method {
    case http.MethodGet:
        idStr := strings.TrimPrefix(r.URL.Path, "/user/")
        id, err := strconv.Atoi(idStr)
        if err != nil {
            http.Error(w, "invalid id", http.StatusBadRequest)
            return
        }

        u, ok := s.byID[id]
        if !ok {
            http.Error(w, "not found", http.StatusNotFound)
            return
        }

        if err := json.NewEncoder(w).Encode(u); err != nil {
            http.Error(w, "encode error", http.StatusInternalServerError)
        }
    case http.MethodPost:
        var u client.User
        if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
            http.Error(w, "invalid json", http.StatusBadRequest)
            return
        }

        if u.ID == 0 {
            http.Error(w, "missing id", http.StatusBadRequest)
            return
        }

        s.byID[u.ID] = u

        if err := json.NewEncoder(w).Encode(u); err != nil {
            http.Error(w, "encode error", http.StatusInternalServerError)
        }
    default:
        http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
    }
}

func main() {
    store := newUserStore()

    mux := http.NewServeMux()
    mux.HandleFunc("/user/", store.handleUser)
    mux.HandleFunc("/user", store.handleUser)

    log.Println("listening on :8080")
    if err := http.ListenAndServe(":8080", mux); err != nil {
        log.Fatal(err)
    }
}
