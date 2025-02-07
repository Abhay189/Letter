#!/bin/bash

set -e  # Exit immediately if any command fails

# Azure DevOps Variables
AZURE_DEVOPS_URL="https://dev.azure.com/sabhay2001"
AZURE_AGENT_NAME=""
AZURE_POOL="EC2-Agents"

if [[ -z "$AZURE_DEVOPS_PAT" ]]; then
    read -s -p "Enter your Azure DevOps Personal Access Token (PAT): " AZURE_DEVOPS_PAT
    echo
fi

read -s -p "Enter a name for Azure Host Agent :" AZURE_AGENT_NAME
echo

# Ensure AZURE_DEVOPS_PAT is set
if [[ -z "$AZURE_DEVOPS_PAT" ]]; then
    echo "Error: AZURE_DEVOPS_PAT is not set. Exiting."
    exit 1
fi

echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install dependencies
echo "Installing dependencies..."
sudo apt install -y curl libunwind8 tar wget

# ------------- Install Azure DevOps Agent -------------
echo "Setting up Azure DevOps Agent..."
AGENT_DIR=~/azure-agent
mkdir -p "$AGENT_DIR" && cd "$AGENT_DIR"
chmod u+w "$AGENT_DIR"

AGENT_VERSION="3.220.2"
AGENT_PACKAGE="vsts-agent-linux-x64-$AGENT_VERSION.tar.gz"

if [ ! -f "$AGENT_PACKAGE" ]; then
    wget "https://vstsagentpackage.azureedge.net/agent/$AGENT_VERSION/$AGENT_PACKAGE"
fi

tar -xvf "$AGENT_PACKAGE"

echo "Configuring Azure DevOps Agent..."
./config.sh --unattended \
    --url "$AZURE_DEVOPS_URL" \
    --auth pat \
    --token "$AZURE_DEVOPS_PAT" \
    --pool "$AZURE_POOL" \
    --agent "$AZURE_AGENT_NAME" \
    --replace

echo "Installing and starting Azure DevOps Agent as a service..."
sudo ./svc.sh install
sudo ./svc.sh start

echo "Azure DevOps Agent setup completed successfully."


# ------------- Install Docker daemon on Host Agent -------------
if ! command -v docker &> /dev/null; then
    echo "Installing Docker daemon on the host machine..."
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg lsb-release

    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io

    echo "Starting Docker service..."
    sudo systemctl start docker
    sudo systemctl enable docker

    echo "Adding current user ($USER) to the docker group..."
    sudo usermod -aG docker $USER

    echo "Docker daemon installation completed successfully."

    echo "Rebooting the system to apply group membership changes..."
    sudo reboot
else
    echo "Docker is already installed. Skipping installation."
fi
