# video-common

静态页面   nginx 配置
server {
		listen       80;
		server_name  127.0.0.1;
		
		location /{
		   root   html;
		   index  index.html index.htm;
		}
		
		location /api/{
		  proxy_pass   http://127.0.0.1:8888/;
		  proxy_redirect off;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
		proxy_max_temp_file_size 0;
		proxy_connect_timeout 300s;
		proxy_send_timeout 300s;
		proxy_read_timeout 300s;
		proxy_buffer_size 4k;
		proxy_buffers  4 32k;
		proxy_busy_buffers_size 64k;
		proxy_temp_file_write_size 64k;
		index  index.html index.htm;
		client_body_buffer_size 128k;
		}
	}
