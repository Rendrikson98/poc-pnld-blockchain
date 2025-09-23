```

  █ THRESHOLDS

    data_accuracy_rate
    ✓ 'rate>0.95' rate=100.00%

    error_rate
    ✓ 'rate<0.10' rate=0.00%

    http_req_duration
    ✓ 'p(95)<10000' p(95)=7.98s

    http_req_failed
    ✓ 'rate<0.10' rate=0.00%

    http_req_waiting
    ✓ 'p(95)<10000' p(95)=7.98s

    network_latency_ttfb
    ✓ 'p(95)<10000' p(95)=7989.318917

    response_validation_rate
    ✓ 'rate>0.95' rate=100.00%

    service_time_ms
    ✓ 'p(95)<10000' p(95)=7989.491717


  █ TOTAL RESULTS

    checks_total.......: 7164   16.453775/s
    checks_succeeded...: 89.33% 6400 out of 7164
    checks_failed......: 10.66% 764 out of 7164

    ✓ Receber edital - Status 201
    ✗ Receber edital - Tempo resposta < 3s
      ↳  57% — ✓ 229 / ✗ 169
    ✗ Receber edital - TTFB < 1.5s
      ↳  29% — ✓ 119 / ✗ 279
    ✓ Receber edital - Tem corpo da resposta
    ✓ Atualizar edital - Status 200
    ✗ Atualizar edital - Tempo resposta < 3s
      ↳  98% — ✓ 393 / ✗ 5
    ✓ Enviar próxima fase edital - Status 201
    ✗ Enviar próxima fase edital - Tempo resposta < 3s
      ↳  65% — ✓ 259 / ✗ 139
    ✓ Registrar obra - Status 201
    ✗ Registrar obra - Tempo resposta < 3s
      ↳  98% — ✓ 392 / ✗ 6
    ✓ Emitir relatório submissão - Status 200
    ✗ Emitir relatório submissão - Tempo resposta < 3s
      ↳  96% — ✓ 386 / ✗ 12
    ✓ Enviar próxima fase submissão - Status 200
    ✗ Enviar próxima fase submissão - Tempo resposta < 3s
      ↳  64% — ✓ 255 / ✗ 143
    ✓ Receber avaliadores - Status 201
    ✗ Receber avaliadores - Tempo resposta < 3s
      ↳  98% — ✓ 393 / ✗ 5
    ✓ Emitir relatório avaliação - Status 200
    ✗ Emitir relatório avaliação - Tempo resposta < 3s
      ↳  98% — ✓ 392 / ✗ 6

    CUSTOM
    bandwidth_utilization_bytes......: 1558    min=820          max=1560
    data_accuracy_rate...............: 100.00% 3184 out of 3184
    error_rate.......................: 0.00%   0 out of 3184
    network_latency_ttfb.............: avg=1948.820553 min=44.877851 med=913.660405 max=11124.552859 p(90)=6158.988406 p(95)=7989.318917
    response_validation_rate.........: 100.00% 3184 out of 3184
    service_time_ms..................: avg=1949.033327 min=45.039157 med=913.896867 max=11124.790061 p(90)=6159.186402 p(95)=7989.491717
    throughput_requests_per_second...: 398     0.914099/s

    HTTP
    http_req_duration................: avg=1.94s       min=45.03ms   med=913.89ms   max=11.12s       p(90)=6.15s       p(95)=7.98s
      { expected_response:true }.....: avg=1.94s       min=45.03ms   med=913.89ms   max=11.12s       p(90)=6.15s       p(95)=7.98s
    http_req_failed..................: 0.00%   0 out of 3184
    http_reqs........................: 3184    7.312789/s

    EXECUTION
    iteration_duration...............: avg=23.49s      min=9s        med=18.76s     max=47.98s       p(90)=44.37s      p(95)=45.48s
    iterations.......................: 395     0.907208/s
    vus..............................: 1       min=1            max=50
    vus_max..........................: 50      min=50           max=50

    NETWORK
    data_received....................: 2.4 MB  5.6 kB/s
    data_received_bytes..............: 1660972 3814.8045/s
    data_sent........................: 997 kB  2.3 kB/s
    data_sent_bytes..................: 1660972 3814.8045/s




running (7m15.4s), 00/50 VUs, 395 complete and 3 interrupted iterations
default ✓ [======================================] 00/50 VUs  7m0s


```