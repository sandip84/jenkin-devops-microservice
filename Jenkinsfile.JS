pipeline {
  agent any

  env {
    dockerHome = tool 'myDocker'
    mavenHome  = tool 'myMaven'
    PATH = "$dockerHome/bin:$mavenHome/bin:$PATH"
  }
  stages      {
    stage('Build') {
      steps {
        sh 'mvn --version'
        sh 'docker version'
        echo 'Build'
        echo "$PATH"
        echo "Build Number: $env.BUILD_NUMBER"
        echo "Build Tag : $env.BUILD_TAG"
      }
    }
  }
}
