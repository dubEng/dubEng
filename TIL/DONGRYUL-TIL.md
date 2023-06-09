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

## 23-04-18
- 쿠버네티스 Deployment 배포 실습
    
    기존의 버전

    kubectl run 으로 pod, deploy 배포 가능

    현재의 버전
    - kubectl create
    - kubectl apply
        - yaml 파일로 배포
    ```
    [root@m-k8s ~]# kubectl create deployment deploy-nginx --image=nginx
    deployment.apps/deploy-nginx created

    [root@m-k8s ~]# kubectl get pods
    NAME                            READY   STATUS              RESTARTS   AGE
    deploy-nginx-67c78b5cfc-wlz96   0/1     ContainerCreating   0          8s
    nginx                           1/1     Running             0          117m
    ```

## 23-04-19
- container registry 구축 실습
- React Pitch Detection 연구

## 23-04-20
- API 명세서 작성
- Kubernetes Ingress 개념 학습
- kubernetes nginx-controller 개념 학습

## 23-04-21
- 중간 발표
- EC2 Server에 Jenkins, Nginx 세팅


## 23-04-24
- kubeadm 으로 Control plain 생성
- calico 네트워크 생성
- worker node join
