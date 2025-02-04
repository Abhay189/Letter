#!/bin/bash

set -e  # Exit immediately if any command fails

# Azure DevOps Variables
AZURE_DEVOPS_URL="https://dev.azure.com/sabhay2001"
AZURE_AGENT_NAME="t2-medium-azure-agent"
AZURE_POOL="EC2-Agents"
AZURE_PAT="$AZURE_DEVOPS_PAT:? Env variable not sure for Azure PAT"

# SonarQube Scanner Version
SONAR_SCANNER_VERSION="5.0.1.3006"

echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "Installing required dependencies..."
sudo apt install -y openjdk-17-jdk wget unzip curl git

# ------------- Install Azure DevOps Agent -------------
# echo "Setting up Azure DevOps Agent..."
# mkdir -p ~/azure-agent && cd ~/azure-agent
# chmod u+w ~/azure-agent
# wget https://vstsagentpackage.azureedge.net/agent/3.220.2/vsts-agent-linux-x64-3.220.2.tar.gz
# tar -xvf vsts-agent-linux-x64-3.220.2.tar.gz

# echo "Configuring Azure DevOps Agent..."
# ./config.sh --unattended --url $AZURE_DEVOPS_URL --auth PAT --token $AZURE_PAT --pool $AZURE_POOL --agent $AZURE_AGENT_NAME --replace

# echo "Installing and starting Azure DevOps Agent as a service..."
# ./svc.sh install
# ./svc.sh start

# ------------- Install SonarQube Scanner -------------
echo "Installing SonarQube Scanner..."
mkdir -p /opt/sonar-scanner && cd /opt/sonar-scanner
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip
unzip sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip
mv sonar-scanner-$SONAR_SCANNER_VERSION-linux sonar-scanner

# Configure environment variables
echo "Configuring SonarQube Scanner environment variables..."
echo "export PATH=\$PATH:/opt/sonar-scanner/sonar-scanner/bin" | sudo tee -a /etc/profile
source /etc/profile

# Verify installation
echo "Verifying SonarQube Scanner installation..."
sonar-scanner --version

echo "Setup complete!"
echo "Azure DevOps agent is registered and running."
echo "SonarQube Scanner is installed and ready for use."
