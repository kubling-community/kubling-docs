#!groovy
import java.time.Instant

pipeline {
    agent any
    options { timestamps () }
    parameters {
        choice(name: 'CACHE', choices: ['', '--no-cache'], description: 'Build context cache')
    }
    stages {
        stage('Build and Publish') {
            environment {
                SERVICE_NAME = "kubling-docs"
                VERSION = "24.5.1"
                DOCKERHUB_CREDS = credentials('kubling-dockerhub')
            }
            steps {
                script {
                    env.NOW_SECONDS = Instant.now().getEpochSecond()
                }
                sh """
                  docker build $CACHE -t kubling/$SERVICE_NAME:$VERSION .
                """

                sh """ echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin """
                sh """ docker push kubling/$SERVICE_NAME:$VERSION """
                sh """ docker push kubling/$SERVICE_NAME:latest """
                sh """ docker image rm kubling/$SERVICE_NAME:$VERSION """
                sh """ docker image rm kubling/$SERVICE_NAME:latest """

                sh """ docker system prune -f """

            }
        }
    }
}