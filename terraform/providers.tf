/*

aws s3api create-bucket --bucket dearing-io-terraform-state
aws s3api put-bucket-versioning --bucket dearing-io-terraform-state --versioning-configuration Status=Enabled
*/

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  // aws s3api create-bucket --bucket dearing-io-terraform-state  
  backend "s3" {
    bucket = "dearing-io-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}