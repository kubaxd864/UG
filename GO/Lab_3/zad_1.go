package main

import (
	"fmt"
	"time"
)

type Reserwation struct {
	Id int
	Client_id int
	Start_date time.Time
	End_date time.Time
	Status string
}

type Plane struct {
	Id int
	Type string
}

type Flight struct {
	Id int
	Start string
	Destination string
}

func main(){
	r := Reserwation{
		Id:         1,
		Client_id:  100,
		Start_date: time.Now(),
	}

	fmt.Println(r)
}