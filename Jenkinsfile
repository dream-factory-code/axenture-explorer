def imageName = 'dreamfactoryhr/axenture-explorer:latest'
def containerName = 'axenture-explorer'
def remoteAddress = 'admin@172.31.3.195'
def containerPort = '9090'

def slackChannel = 'deployments'
def targetEnvironment = 'STAGING'
def defaultBuildMessage = " \'${env.JOB_NAME}\' [${env.BUILD_NUMBER}]" +
                         " (<${env.RUN_DISPLAY_URL}|Pipeline>)"

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
                sh 'docker build . -t ' + imageName
            }
        }

        stage('Deploy to App') {
            when { branch 'master' }

            steps {
                sh 'docker save ' + imageName +
                ' | ssh -C ' + remoteAddress + ' sudo docker load'

                sh 'ssh -C ' + remoteAddress + ' "sudo docker ps -f name=' + containerName + ' -q ' +
                ' | xargs --no-run-if-empty sudo docker container stop ' +
                ' | xargs --no-run-if-empty sudo docker container rm" '

                sh 'ssh -C ' + remoteAddress + ' sudo docker run -d ' +
                ' -p ' + containerPort + ':80 --name ' + containerName +
                ' ' + imageName

                script {
                    def buildTime = currentBuild.durationString.replace(' and counting', '')

                    slackMessage = "Deployed *Axenture Explorer* to *" + targetEnvironment + "* (" +
                            "<${env.RUN_DISPLAY_URL}|Pipeline>" +
                            ", <https://testnet.dream-factory.hr/|Explorer Application>" +
                            ") \n" +
                            "Pipeline time: ${buildTime}"

                    slackSend(channel: slackChannel, color: 'good', message: slackMessage,
                            teamDomain: SLACK_TEAM, baseUrl: SLACK_URL, token: SLACK_TOKEN)
                }
            }
        }

        stage('Docker cleanup') {
            steps {
                sh 'docker system prune -f'
                sh 'docker rmi ' + imageName
                sh 'ssh -C ' + remoteAddress + ' "sudo docker system prune -f"'
            }
        }
    }

    post {
        success {
            script {
                if (env.BRANCH_NAME == 'hackNoMessage') {
                    slackSend(channel: slackChannel, color: 'good',
                            message: "Success" + defaultBuildMessage,
                            teamDomain: SLACK_TEAM, baseUrl: SLACK_URL, token: SLACK_TOKEN)
                }
            }
        }

        failure {
            script {
                slackSend(channel: slackChannel, color: 'danger',
                        message: "FAILED" + defaultBuildMessage,
                        teamDomain: SLACK_TEAM, baseUrl: SLACK_URL, token: SLACK_TOKEN)
            }
        }
    }

}
