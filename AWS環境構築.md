# Github作成
 * Githabページに自身のディレクトリを作成
 * docディレクトリ配下にmdファイルを格納する想定。(きれいにプレビューできた方がいいでしょうか)

# AWS 環境構築
##　 AWS ECS上に構築するSpringアプリケーション(1) (5/2)

1. VPCの作成
https://news.mynavi.jp/itsearch/article/devsoft/4354¶
 * VPCは既存のものを流用する想定。



>困っていること：AWS運用ファイルを確認の上、課題4の中で、どれはやってよくてどれはだめなのか整理すること


1. パブリックサブネットとプライベートサブネットの作成
  > TODO : AWS前回フォルダが削除されているので再作成する予定

1. カスタムルートテーブルの作成／メインルートテーブルの設定
  > TODO : AWS前回フォルダが削除されているので再作成する予定

1. インターネットゲートウェイの作成／VPCへのアタッチ
 * インターネットGWは既存のものを流用する想定。

1. NATゲートウェイの設定／アタッチ
  > TODO : AWS前回フォルダが削除されているので再作成する予定



## AWS ECS上に構築するSpringアプリケーション(2) （5/9）

1. ALBの作成

1. ALBの設定

1. ロードバランサのセキュリティグループを作成する

1. ルーティングの設定

1. ターゲットグループの登録
1. パスベースのルーティング設定

## AWS ECS上に構築するSpringアプリケーション(3) (5/9)

1. pom作成
1. アプリケーション実装 

## AWS ECS上に構築するSpringアプリケーション(4) (5/9)
1. Dockerコンテナの作成／DockerHubへのプッシュ
1. Backendアプリケーションのプロジェクトに作成するDockerfile
1. BFF(Backend For Frontend)アプリケーションのプロジェクトに作成するDockerファイル

## AWS ECS上に構築するSpringアプリケーション(5) (5/16)
1. ECSクラスタの作成
1. アクセス許可を追加する

## AWS ECS上に構築するSpringアプリケーション(6)(5/16)
1. ECSタスクの定義  
    1. ロールの作成
    1. 新しいタスク定義の作成

## AWS ECS上に構築するSpringアプリケーション(7)(5/16)
1. ECSサービスの実行

## Amazon RDSにアクセスするSpringアプリケーション(1)(5/23)
1. Amazon RDSの構築
1. ユーザー／認証情報の作成

## Amazon RDSにアクセスするSpringアプリケーション(2)(5/30)
1. Spring Data JPAおよびSpring Cloud AWSの概要 読み込み
1. Mavenプロジェクトのpom.xml構築
1. クラスの実装
    * App
    * DomainConfig
    * JpaConfig
    * RDSConfig
    * SampleService
    * Xxxxx(Entity)
    * XxxxxRepository

## Amazon RDSにアクセスするSpringアプリケーション(3)(5/30)

## Spring Data DynamoDBを用いたアプリケーション(1)

## Spring Data DynamoDBを用いたアプリケーション(2)

## Webアプリケーションからマイクロサービスを呼び出す実装(1)

## Webアプリケーションからマイクロサービスを呼び出す実装(2)


