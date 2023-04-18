# Dongryul TIL

## 23-04-10
- 기획 회의
- 컨설턴트님 기획 팀 미팅


## 23-04-11
- Kubernates 학습 ( 인프런 )
- 기획 회의

## 23-04-12
- 프로젝트 아키텍쳐 설계
- 교보재 신청을 위한 쿠버네티스 서버 사양 파악

## 23-04-13
- 기획 회의
- Kubernates 학습 ( 인프런 )

## 23-04-14
- 기획 구체화
- 컨설턴트님 미팅
- 기능 명세서 작성

## 23-04-17
- 쿠버네티스 파드, 서비스 배포 실습

    파드 배포
    ```
    [root@m-k8s ~]# kubectl run nginx --image=nginx
    pod/nginx created
    [root@m-k8s ~]# kubectl get pod
    NAME    READY   STATUS    RESTARTS   AGE
    nginx   1/1     Running   0          5m23s
    ```
    서비스 배포
    ```
    [root@m-k8s ~]# kubectl expose pod nginx --type=NodePort --port=80
    [root@m-k8s ~]# kubectl get service
    NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
    kubernetes   ClusterIP   10.96.0.1        <none>        443/TCP        159m
    nginx        NodePort    10.108.172.218   <none>        80:30486/TCP   7m44s
    ```

