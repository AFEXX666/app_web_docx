# Build Docker image
- Clean up commands
```
docker container stop <CONTAINER_ID>
docker container remove <CONTAINER_ID>
docker image rm <IMAGE_ID>
```

- Build Command
```
docker build https://gitlab.sysenti.net/uttn/va/eldicaconplan.git -t uttn/planeacion:latest
```

- Run Command
```
docker run -d --restart unless-stopped -p 5021:5000 -v planeacion:/usr/src/app/static <IMAGE_ID>