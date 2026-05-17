import requests
import json
import time
from datetime import datetime

def pobierz_posty_z_reddita(subreddit, limit=100):
    wszystkie_posty = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    url = f"https://www.reddit.com/r/{subreddit}/new.json?limit=100"
    print(f"Pobieranie postów z r/{subreddit}...")
    while len(wszystkie_posty) < limit:
        try:
            response = requests.get(url, headers=headers)
            
            if response.status_code == 404:
                print(f"❌ Subreddit 'r/{subreddit}' nie istnieje!")
                return []
            elif response.status_code == 429:
                print("⚠️ Zbyt wiele zapytań. Czekam 10 sekund...")
                time.sleep(10)
                continue
            elif response.status_code != 200:
                print(f"❌ Błąd HTTP {response.status_code}")
                return []
            
            data = response.json()
            posty = data['data']['children']
            
            if not posty:
                print("Brak więcej postów do pobrania.")
                break
            
            for post in posty:
                post_data = post['data']
                wszystkie_posty.append({
                    'id': post_data.get('id', ''),
                    'tytul': post_data.get('title', 'Brak tytułu'),
                    'tresc': post_data.get('selftext', '')[:1000] if post_data.get('selftext') else '(brak treści)',
                    'autor': post_data.get('author', '[deleted]'),
                    'data_utc': post_data.get('created_utc', 0),
                    'data_czytelna': datetime.fromtimestamp(post_data.get('created_utc', 0)).strftime('%Y-%m-%d %H:%M:%S'),
                    'oceny': post_data.get('score', 0),
                    'komentarze': post_data.get('num_comments', 0),
                    'url': f"https://reddit.com{post_data.get('permalink', '')}"
                })
                
                if len(wszystkie_posty) >= limit:
                    break

            after = data['data'].get('after')
            if not after or len(wszystkie_posty) >= limit:
                break
                
            url = f"https://www.reddit.com/r/{subreddit}/new.json?limit={min(limit - len(wszystkie_posty), 100)}&after={after}"
            time.sleep(1.5)
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Błąd sieci: {e}")
            break
        except json.JSONDecodeError as e:
            print(f"❌ Błąd parsowania JSON: {e}")
            break
    
    print(f"✅ Pobrano {len(wszystkie_posty)} postów")
    return wszystkie_posty

def zapisz(posty, nazwa_subreddita):
    nazwa_pliku = f'reddit_{nazwa_subreddita}.json'
    with open(nazwa_pliku, 'w', encoding='utf-8') as f:
        json.dump(posty, f, indent=4, ensure_ascii=False)
    print(f"📁 Zapisano w pliku: {nazwa_pliku}")
    print("\n" + "="*80)

if __name__ == "__main__":
    print("="*60)
    print("Pobieranie postów z Reddita")
    print("="*60)

    subreddit = input("Podaj nazwę subreddita (np. 'f1', 'python', 'worldnews'): ").strip().lower()
    posty = pobierz_posty_z_reddita(subreddit, limit=100)

    if posty:
        zapisz(posty, subreddit)
        print("\n" + "="*60)
        print("PODSUMOWANIE STATYSTYK:")
        print(f"✓ Subreddit: r/{subreddit}")
        print(f"✓ Liczba pobranych postów: {len(posty)}")
        print(f"✓ Średnia komentarzy: {sum(p['komentarze'] for p in posty) / len(posty):.1f}")
        print("="*60)
    else:
        print("❌ Nie udało się pobrać postów. Sprawdź:")
        print("   - Czy nazwa subreddita jest poprawna?")
        print("   - Czy masz połączenie z internetem?")