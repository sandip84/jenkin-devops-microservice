pipeline {
  agent any

  environment {
    dockerHome = tool 'myDocker'
    mavenHome  = tool 'myMaven'
    PATH = "$dockerHome/bin:$mavenHome/bin:$PATH"
  }
  stages {
    stage('Checkout') {
      steps {
        sh 'mvn --version'
        sh 'docker version'
        echo 'Build'
        echo "$PATH"
        echo "Build Number: $env.BUILD_NUMBER"
        echo "Build Tag : $env.BUILD_TAG"
      }
    }

    stage('Compile') {
      steps {
        sh "mvn clean compile"
      }
    }

    // stage('Test') {
    //   steps {
    //     sh "mvn test"
    //   }
    // }

    // stage('Integration Test') {
    //   steps {
    //     sh "mvn failsafe:integration-test failsafe:verify"
    //   }
    // }

    // stage('Package') {
    //   steps {
    //     sh "mvn package -DskipTests"
    //   }
    // }

    stage('Build Docker Image') {
      steps {
        // "docker buils -t sandip84/aws-currency-exchange-service-h2:$env.BUILD_TAG"
        script {
            dockerImage = docker.build("sandip84/aws-currency-exchange-service-h2:${env.BUILD_NUMBER}")
        }
      }
    }
    stage('Push Docker Image') {
      steps {
        script {
          // docker.withRegistry('','dockerhub') {
          //   dockerImage.push()
          //   // dockerImage.push('latest')
          // }
          docker.withRegistry("752362912519.dkr.ecr.us-east-1.amazonaws.com/currency-exchange", "dockerhub") {
            dockerImage.push()
          }          
        }
      }
    }

  }
}
