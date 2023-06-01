# Automating Version Control Via Semantic Release and Conventional Commits

---

## Necessary Packages

| Language | Package    | Link                                                   |
| -------- | ---------- | ------------------------------------------------------ |
| `(j/t)s` | commitlint | [Link](https://commitlint.js.org/#/guides-local-setup) |

|
|`(j/t)s`| Semantic Release | [Link](https://github.com/semantic-release/semantic-release)
`.py` | commit-linter | [Link](https://pypi.org/project/commit-linter/)

**Good to know about**

- [`angular-commit-convention`](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format)

---

## Goal

Generate versions, tags, and change logs using commit types.

---

## Approach

We can use [`semantic-release`](https://github.com/semantic-release/semantic-release) to analyze the commit message format to automate creating release types. By default, [`semantic-release`](https://github.com/semantic-release/semantic-release) uses the [`angular-commit-convention`](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format) and we can enforce this in our Python and JavaScript
projects with [`commitlint`](https://commitlint.js.org/#/guides-local-setup) (js) and
[`commitlinter`](https://pypi.org/project/commit-linter/) (py).

<details>
  <summary>Angular Commit Convention Description</summary>
  ```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```
</details>

`semantic-release` is meant to be a CI tool, that is run after every successful build **on the
release branch**, but you can [create maintenance releases](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/release-workflow/maintenance-releases.md#publishing-maintenance-releases),
[pre releases](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/release-workflow/pre-releases.md#publishing-pre-releases), and [distribution channels](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/release-workflow/distribution-channels.md#publishing-on-distribution-channels)

### Pipeline

Prefer to use Github actions or Gitlab CI/CD.

<details>
  <summary>Gitlab Pipeline Job</summary>
  
  ```
  //GITLAB CONFIG
  variables:
    # Main env variables. DO NOT REMOVE!!!

generate-version:
stage: generate-version
image:
name: smartive/semantic-release-image:2021-10-15T14-35-19UTC # pull_policy: if-not-present
before_script: - npm install @semantic-release/gitlab -D
script: - git config --global http.emptyAuth true - npx semantic-release --dry-run - test -e .VERSION || (echo $(git describe --abbrev=0 --tags | tr -d v) > .VERSION && touch .NORELEASE) - echo "Determined Version $(cat .VERSION)"
artifacts:
paths: - .VERSION - .NORELEASE
rules: - if: $CI_COMMIT_BRANCH == "main" - if: $CI_COMMIT_BRANCH == "dev"

build:
stage: build

# services:

# - $DOCKER_DIND_IMAGE

# image: $DOCKER_IMAGE

services: - docker:20.10.16-dind
image: docker:20.10.16

before_script: - until docker info; do sleep 1; done - echo $CI_BUILD_TOKEN | docker login -u $CI_REGISTRY_USER $CI_REGISTRY --password-stdin
    script:
      - |
        if [[ $(expr $CI_COMMIT_BRANCH : "feat") -ne 0 ]] \
          || [[ $(expr $CI_COMMIT_BRANCH : "fix") -ne 0 ]] \
          || [[ $(expr $CI_COMMIT_BRANCH : "build") -ne 0 ]]; then
            export BUILD_VERSION=$(echo $CI_COMMIT_BRANCH | tr / -)
            echo "this is a fix,build, or feat branch so setting tag to $BUILD_VERSION"
          else
            export BUILD_VERSION=$(cat .VERSION)
fi - !reference [.build, script]

push_tag:
stage: push_tag
image:
name: smartive/semantic-release-image:2021-10-15T14-35-19UTC # pull_policy: if-not-present
before_script: - npm install @semantic-release/gitlab -D
script: - npx semantic-release
rules: - if: $CI_COMMIT_BRANCH == "main" - exists: - .NORELEASE
when: never

```
</details>

- This essentially creates the versions by running semantic release, and pushes the tags
with the same packages.

___

## Crafting Commits to Generate Good Release Notes

The release notes that are generated look like this:
>
># [1.59.0](https://gitlab.absci.cloud/informatics/core-services/compare/1.58.0...1.59.0) (2023-05-23)
>
>
>### Bug Fixes
>
>* **core-539:** allow content overflow ([4ffa993](https://gitlab.absci.cloud/informatics/core-services/commit/4ffa99333b5ec871f35b2ab9e3275c777b952e4b))
>
>
>### Features
>
>* **core-119:** add antibody biophysical properties to antibody table ([15679d3](https://gitlab.absci.cloud/informatics/core-services/commit/15679d3fec29cbd001e14c03b4d9dcd7cf7ee6d2))
>* **core-594:** add additional secions about antibody to table in expand ([eb566b2](https://gitlab.absci.cloud/informatics/core-services/commit/eb566b2133fc127d20581d1e933f6221ed5592fa))
>* update codeowners ([99d06ec](https://gitlab.absci.cloud/informatics/core-services/commit/99d06ecea8b5bcfff0b034b44b2f46f303b326c1))



In it you can see the version number, the types of changes introduced, and the commit message
for the change. This is where it becomes important to squash commits on feature branches
before merging them into a release branch.

Say a feature branch has five commits for adding a user's initials to header component:

```

wip: adding config
fix: refactor header component layout
test: add test for function
refactor: connect user state to header
feat: add user initials avatar to header

```

If we merge these five commits into the release branch, then our release notes will contain a
lot of "noise" that will make it difficult to understand what the purpose of the release was /
what was added. Once a merge/pull request has been approved, all the commits should be squashed
one with a commit message that describes the change:

```

feat: add user initials avatar to header

```

**Never squash a release branch**
```
