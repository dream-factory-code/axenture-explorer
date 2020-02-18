
pipeline {
    agent any
    options { disableConcurrentBuilds() }

    environment {
        SLACK_URL   = credentials('slackUrl')
        SLACK_TOKEN = credentials('slackToken')
        SLACK_TEAM  = credentials('slackTeam')
    }

    stages {
        stage('Build image') {
            steps {
                sh 'docker build . -t dreamfactoryhr/axenture-explorer:latest'
            }
        }

        stage('Deploy to App') {
            when { branch 'master' }

            steps {
                sh 'docker save dreamfactoryhr/axenture-explorer:latest ' +
                ' | ssh -C admin@172.31.3.195 sudo docker load'

                sh 'ssh -C admin@172.31.3.195 "sudo docker ps -f name=axenture-explorer -q ' +
                ' | xargs --no-run-if-empty sudo docker container stop ' +
                ' | xargs --no-run-if-empty sudo docker container rm" '

                sh 'ssh admin@172.31.3.195 sudo docker run -d ' +
                ' -p 9090:80 --name axenture-explorer ' +
                ' dreamfactoryhr/axenture-explorer:latest'

                script {
                    def buildTime = currentBuild.durationString.replace(' and counting', '')

                    slackMessage = "Deployed *Axenture Explorer* to *STAGING* (" +
                            "<${env.RUN_DISPLAY_URL}|Pipeline>" +
                            ", <https://testnet.dream-factory.hr/|Explorer Application>" +
                            ") \n" +
                            "Pipeline time: ${buildTime}"

                    slackSend(channel: 'test-results', color: 'good', message: slackMessage,
                            teamDomain: SLACK_TEAM, baseUrl: SLACK_URL, token: SLACK_TOKEN)
                }
            }
        }

        stage('Docker cleanup') {
            steps {
                sh 'docker system prune -f'
                sh 'docker rmi dreamfactoryhr/axenture-explorer'
            }
        }
    }

    post {
        success {
            script {
                if (env.BRANCH_NAME == 'hackNoMessage') {
                    slackSend(channel: 'test-results', color: 'good',
                            message: "Success \'${env.JOB_NAME} [${env.BUILD_NUMBER}]\'" +
                                    " (<${env.RUN_DISPLAY_URL}|Pipeline>)",
                            teamDomain: SLACK_TEAM, baseUrl: SLACK_URL, token: SLACK_TOKEN)
                }
            }
        }

        failure {
            script {
                slackSend(channel: 'test-results', color: 'danger',
                        message: "FAILED \'${env.JOB_NAME} [${env.BUILD_NUMBER}]\'" +
                                " (<${env.RUN_DISPLAY_URL}|Pipeline>)",
                        teamDomain: SLACK_TEAM, baseUrl: SLACK_URL, token: SLACK_TOKEN)
            }
        }
    }

}
