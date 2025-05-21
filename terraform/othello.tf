
// gather our compiled web files
data "local_file" "web_files" {
  for_each = fileset("${path.module}/../dist/web", "**/*")
  filename = "${path.module}/../dist/web/${each.value}"
}

// TODO: these files are already cache busting, but cruft could be left in s3
// each file needs to be uploaded to s3, distinguishing md5 sum of the contents
resource "aws_s3_object" "web_files" {
  for_each = fileset("${path.module}/../dist/web", "**/*")

  bucket = aws_s3_bucket.website.id
  key    = each.value
  source = "${path.module}/../dist/web/${each.value}"

  content_type = lookup({
    "html" = "text/html",
    "css"  = "text/css",
    "js"   = "application/javascript",
    "png"  = "image/png",
    "jpg"  = "image/jpeg",
    "jpeg" = "image/jpeg",
    "svg"  = "image/svg+xml",
    "ico"  = "image/x-icon"
  }, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")

  cache_control = "max-age=86400"
  etag          = filemd5("${path.module}/../dist/web/${each.value}")
}


// emit the url to visit the website
output "website_url" {
  value = "https://${aws_cloudfront_distribution.website.domain_name}"
}
