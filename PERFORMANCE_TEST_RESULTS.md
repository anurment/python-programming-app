# Performance test results  
  
Brief description of the used server: HTTP/1.1  
  
  
Brief description of the computer:  
OS: Win 10 Pro  
Mobo: X470 AORUS GAMING 5 WIFI  
Processor: AMD RYZEN 7 5700X3D 8-Core  
Memory: 32GB  
GPU: NVIDIA GeForce RTX 4070  
  
## Test parameters:  
  
duration: 10s  
vus: 10  
  
### Retrieving assingment -page  
  
http_reqs: 4582  
http_req_duration - median: 21022.65µs  
http_req_duration - 99th percentile: 38209.75µs  
  
  
### Posting incorrect solution  
  
http_reqs: 1208  
http_req_duration - median: 66643.40µs  
http_req_duration - 99th percentile: 200361.42µs  
  
### Posting correct solution  
  
http_reqs: 1214  
http_req_duration - median: 72012.25µs  
http_req_duration - 99th percentile: 208896.97µs  




