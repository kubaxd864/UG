def is_pangram(sentence):
    alphabet = set('abcdefghijklmnopqrstuvwxyz')
    if alphabet <= set(sentence.lower()):
        print('To zdanie jest pangramiem')
    else:
        print('To zdanie nie jest pangramem')
        
is_pangram("The quick brown fox jumps over the lazy dog")