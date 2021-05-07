#イメージの作成とコンテナ起動
alias vue-pj="docker-compose up --build app"

#コンテナ内のshファイルを起動
alias vue-exec="docker exec -it vuecli3 sh"

#dockerコンテナを外部アクセステスト状態で起動
alias vue-dev-run="docker run -t -p 9000:18080 -d --rm vuecli:1"

#外部アクセステスト状態コンテナでshファイルを起動
alias vue-dev-exec="docker exec -it wonderful_burnell sh"
