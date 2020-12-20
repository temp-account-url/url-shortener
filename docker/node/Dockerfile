FROM node:14.15.0-buster as builder

WORKDIR /var/app/backend

COPY wait-for-it.sh /var/tool/wait-for-it.sh
RUN chmod +x /var/tool/wait-for-it.sh
#RUN ls -la /var/app && \
#    ( cd packages/frontend && yarn install && yarn build ) && \
#    ( cd packages/backend && yarn install && yarn build );
#
#
#
#FROM node:14.15.0-buster
#
#RUN mkdir "/workdir"
#
## copy the repository form the previous image
##COPY --from=builder /build /tmp/
#
#WORKDIR /project
#
ENTRYPOINT [ "yarn", "run"]
CMD ["start"]
