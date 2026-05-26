package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func StartLogger(logChan <-chan any) {	
	file, err := os.OpenFile("logs/grid_history.json", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		fmt.Println("[Logger] Błąd otwarcia pliku:", err)
		return
	}
	defer file.Close()

	for msg := range logChan {
		jsonData, err := json.Marshal(msg)
		if err != nil {
			fmt.Println("[Logger] Błąd JSON:", err)
			continue
		}

		_, err = file.WriteString(string(jsonData) + "\n")
		if err != nil {
			fmt.Println("[Logger] Błąd zapisu:", err)
			continue
		}
	}
}