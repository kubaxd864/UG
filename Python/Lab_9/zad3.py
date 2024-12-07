songs = {'Ransom' : 5, 'Decadence': 4, 'Ritz Carlton': 5}

def over_5(songs):
    for i in songs:
        if songs[i] == 5:
            print(i)

over_5(songs)