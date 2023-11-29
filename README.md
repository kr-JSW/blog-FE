## 블로그

![Coding Archive-logo](https://github.com/kr-JSW/blog-FE/assets/150055151/32bf2710-7af3-4efc-a184-90100e3bf5f9)

### 가입 코드를 통해 가입이 가능한 공유형 블로그.
---

## 프로젝트 소개
많은 기술 블로그들이 개발자 개인의 공부와 정보 공유를 목적으로 운영되고 있습니다. 하지만 이제 막 공부를 시작한 개발자 지망생들을 목표로한 블로그 플랫폼은 아직 보지 못했습니다.
<br/>
그래서 그들이 기술 블로그를 운영한다면 겪게 되는 어려움이 뭐가 있을까? 라는 질문을 던졌습니다.
<br/>
특정 집단에 소속되어 같이 공부 할 학우가 있는 사람들의 경우에는 오늘 본인이 얼마나 공부했는지, 어떤 공부를 했는지를 서로 의식하며 열정에 불을 붙일 수 있겠지만, 개인의 경우에는 그게 어렵다는 사실을 자각하였습니다.
<br/>
그렇다면, 공유형 블로그를 만들어서 서로가 공부한 내용을 각자 기록 가능한 블로그를 만들어보자. 그 기록들을 서로 살펴보면서 선의의 경쟁을 하자! 라는 목적으로 해당 프로젝트를 시작하게 되었습니다.
<br/>
필요한 기능을 생각해보니, 누구나 가입을 가능하게 만들어서는 안된다는 생각이 들었습니다. 왜냐하면 정말 의식하면서 공부를 같이 할 수 있는 사람을 가릴 수 있는게 목적이니 말입니다.
<br/>
그래서 EmailJs를 이용하여 개인적으로 연락이 가능하게하고, 그 중에 원하는 사람을 정하여 가입코드를 전달하여 가입을 가능하게 만들었습니다.

<br/>
<br/>
<br/>

## 세부기능
- 가입시 코드가 필요합니다.
- 게시글 썸네일, 프리뷰, CRUD, 코드양식 생성이 가능합니다.
- 마이 페이지(관리자 추가 기능),카테고리 생성, 유저관리(등급 조정 및 탈퇴), 가입 코드 관리(생성, 삭제, 복사), 유저 프로필 사진 업데이트(이미지url 혹은 file), 등급 확인, 패스워드 변경
- EmailJs를 이용하여, 필요시 개발자와 연락이 가능합니다.

<br/>
<br/>
<br/>

## Stack

#### Environment
<div align=center>
  <img src="https://img.shields.io/badge/github-181717?style=plastic&logo=github&logoColor=white">   
  <img src="https://img.shields.io/badge/git-F05032?style=plastic&logo=git&logoColor=white">   
  <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=plastic&logo=visualstudiocode&logoColor=white">   
</div>

#### Development
<div align=center>
  <img src="https://img.shields.io/badge/nextjs-181717?style=plastic&logo=nextdotjs&logoColor=white"> 
  <img src="https://img.shields.io/badge/reactjs-61DAFB?style=plastic&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/.env-007396?style=plastic&logo=dotenv&logoColor=white">   
  <img src="https://img.shields.io/badge/zustand-007396?style=plastic&logo=zustand&logoColor=white">   
  <img src="https://img.shields.io/badge/emailjs-007396?style=plastic&logo=zustand&logoColor=white">  
    <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=plastic&logo=tailwindcss&logoColor=white">  
    <img src="https://img.shields.io/badge/axios-5A29E4?style=plastic&logo=axios&logoColor=white">  
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=plastic&logo=javascript&logoColor=white">  
    <img src="https://img.shields.io/badge/html-E34F26?style=plastic&logo=html5&logoColor=white">  
    <img src="https://img.shields.io/badge/css-1572B6?style=plastic&logo=css3&logoColor=white">  
</div>

#### Deploy
<div align=center>
  <img src="https://img.shields.io/badge/vercel-000000?style=plastic&logo=vercel&logoColor=white">   
  </div>

  <br/>
<br/>
<br/>
  
## 아키텍처
![블로그_아키텍처_1차_수정판](https://github.com/kr-JSW/blog-FE/assets/150055151/9eb8ef02-25dc-4295-b6a1-3a7e6cc6dff8)



<br/>
<br/>
<br/>


## 사이트 동작화면

| 기능 | 동작 |상세내용|
| :-----: | :---------: |:---:|
|  가입 |   <img src="https://github.com/kr-JSW/blog-FE/assets/150055151/f15bb5ca-3612-4979-944b-e0e964f5f4d5" width="500"/>    |가입 코드가 있어야지 가입이 가능합니다.<br/> 가입코드는 Contact Me를 통해 개발자에게 요청 할 수 있습니다. |
|  로그인, 프로필 변경, 패스워드 변경 |    <img src="https://github.com/kr-JSW/blog-FE/assets/150055151/1c4d9d0f-e0eb-4e82-a318-b70a7f161295" width="500"/>   |로그인 후, my page로 들어가서 프로필 사진과 패스워드 변경이 가능합니다. <br/> my page의 기능구성은 등급에 따라서 다르게 나타납니다. |
|  유저관리 및 코드관리 |    <img src="https://github.com/kr-JSW/blog-FE/assets/150055151/f7b5431f-e922-4a0c-86cd-e235c2fee5f0" width="500"/>   |관리자 계정으로 로그인을 하게되면, 유저관리 및 가입코드관리탭이 나타나게 됩니다. <br/>  유저관리에서 유저의 등급 조정 및 탈퇴가 가능합니다. <br/> 가입코드관리에서는 코드발급 및 삭제,복사가 가능하며, 유저가 해당 가입코드로 가입을 하게되면, 코드는 자동으로 삭제됩니다.|
|  카테고리 생성 및 삭제 |    <img src="https://github.com/kr-JSW/blog-FE/assets/150055151/fbdfee2e-38cd-4941-9f22-72154489b4bb" width="500"/>   |관리자 계정의 my page에서 카테고리의 생성 및 삭제가 가능합니다.<br/>카테고리의 이름과 배경화면을 이미지URL 및 PC에서 업로드 할 수 있으며, 카테고리를 삭제하게되면, 카테고리에 해당하는 모든 게시글이 삭제됨과 동시에 서버에 저장했던 이미지 파일도 같이 삭제됩니다.|
|  CONTACT ME |    <img src="https://github.com/kr-JSW/blog-FE/assets/150055151/b02e1a50-c2b2-4c3d-821d-c78454808c4f" width="500"/>   |EmailJs를 이용하여 로그인 없이 제 구글 계정에 메일을 전송 할 수 있습니다. 공유형 블로그의 컨셉에 맞게 가입사유와 코드를 요청하면, 심사 후 가입코드를 전달해드립니다. 가입 목적 외의 문의도 동일하게 전달가능합니다.|
|  게시글 작성 |    <img src="https://github.com/kr-JSW/blog-FE/assets/150055151/21845e3e-0b26-4bcf-a09e-ad61c770271e" width="500"/>   |카테고리를 선택하여, 게시글을 작성 할 수 있습니다. <br/> 게시글 성격에 맞는 썸네일을 이미지url 혹은, PC에서 업로드 가능합니다. 그리고 코드 기록이 가능한 코드입력기 기능을 추가하였습니다.|
|  게시글 수정 및 삭제 |    <img src="https://github.com/kr-JSW/blog-FE/assets/150055151/7f827409-759d-456e-9241-f7ff6a750fbc" width="500"/>   |게시글을 수정 및 삭제가 가능합니다.|

<br/>
<br/>
<br/>


## 회고
- 처음에 로그인 기능을 만들때 스스로에게 던졌던 질문이, 이게 만약에 대형 서비스라면 서버의 부담을 줄일 수 있는 방법이 있을까? 라는 질문이었다.<br/> 내 나름대로의 답을 찾아냈는데, 권한이 필요한 활동을 할 때마다 서버에 서명을 확인하는것은 꽤 부담스러운 활동일테니, 5분을 주기로 서버에 서명 확인을 요청하고, 서명 확인 후 디코딩된 데이터를 프론트단의 전역변수로 넣고 사용하자 라는것이 결론이었다.<br/> httpOnly설정과 secure설정을 해뒀으니, 보안도 괜찮을 것이라는 계산에서 였다. <br/>
프로젝트를 다 끝내고 나서 당시의 내 생각이 정말 맞는 생각이었는지 확인하기 위해서, 웹 상으로 자문을 구하고 나름대로 정보를 찾고나서 고민을 하고나서 내린 결론은 좋은 경험이기는 하지만, 웹 성능상의 관점으로 보았을때는
좀 쓸데없는짓에 가까웠다. 경험이 풍부한 개발자들의 생각은 내가 만들었던 로그인 프로세스가 굳이 따지자면 서버에 부담을 덜 주기는 하지만, 서명확인 후 권한인증이라는 과정이 서버에 크게 부담을 주지않기 때문에 큰 차이는 없을 것이라는 의견이었다.<br/>
거기다가 동시에 하나의 문제점이 생겨났는데, 로그인 유지방식을 서버와 실시간 통신이 아닌, 전역변수에 데이터를 담고 있다가 5분단위로 갱신을 하다 보니까, 토큰이 만료되면 그로부터 5분간은 로그아웃이 되어야 함에도 불과하고 여전히 로그인 상태가 유지된다는 점이었다.<br/>
이 부분은 정말 아쉬웠다.
<br/>

- 원래 내가 생각했던 계획은 프론트는 vercel로 호스팅을하고, 백엔드는 쓰지않는 스마트폰에 리눅스를 설치하여, 휴대가능한 서버로 만들자! 였다. 그렇게되면 랩탑처럼 전원선을 계속 달고있을 필요도 없고, 호스팅 비용도 들지않기 때문이었다. 거기다가 애초에 내가 계획했던 기능 중, 게시글의 썸네일로 이미지파일을 서버에 저장하는 것도 있으니, 저장공간은 덤이었다.<br/>
하지만, 계획은 원래의 목적대로 이뤄지는일이 드문 모양인지 andronix를 통하여 우분투를 설치하고 vscode,node 설치등 기초적인 문제는 해결했지만, 한 단계씩 나아갈 때마다, 동시에 생소한 오류가 하나씩 나타났다.<br/>
구글 검색에서 제시하는 해결법을 적용하면, 다음 오류가 곧이어 나타났고, 그 문제를 해결하려하니 모바일 리눅스특유의 오류가 나타나길 반복했다. <br/>
결국 포트포워딩을 통한 도메인 연결은 꽤 오랜시간을 씨름했지만, 실패하고 말았다.
<br/>

- 서버를 로컬에서 운영하는것은 실패했지만, 어찌되었든, 프론트는 한번 배포해봐야 할것이 아닌가. vercel에 배포했지만, 예상치 못한 오류가 나타났다. 로컬에서는 멀쩡히 작동했던 기능들이, 배포 후에는 500에러가 뜨면서 서버통신이 먹통이 되는것이었다. <br/>
getServerSideProps에서 사전렌더링을 하는 부분에서 axios로 서버와 통신하는 기능들만 죄다 고장이 났다. 왜 그럴까 하는 고민을 커뮤니티에 잠깐 올리기도 하고, 계속 생각을 해봤는데, 결국은 답을 구했다.<br/>
useEffect훅에서의 서버와의 통신은 내 프론트 서버에서 일어나지만 getServerSideProps에서 제공하는 사전렌더링 기능은 vercel서버에서 동작하기 때문이었다.<br/>
당시에 서버는 내 로컬서버를 돌려서 테스트를 하고 있었는데, vercel서버에서 내 로컬pc로 당연히 통신이 될리가 없었다.


