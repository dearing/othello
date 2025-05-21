variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "dearing-io-othello"
}

variable "environment" {
  description = "Environment (prod/staging/dev)"
  type        = string
  default     = "prod"
}