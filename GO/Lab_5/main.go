package main

import (
	"context"
	"fmt"
	"main/Lab_5/client"
)

func main() {
    c := client.NewClient("http://localhost:8080")

    ctx := context.Background()

    user, err := c.GetUser(ctx, 1)
    if err != nil {
        panic(err)
    }

    fmt.Println(user.Name)
}