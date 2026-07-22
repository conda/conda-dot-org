---
sidebar_position: 60
---
# Build provenance metadata

Package builders may want to annotate build provenance of their published artifacts.

## Specification

Build provenance metadata is optional. The following metadata identifiers MAY be used to record the corresponding information:

* `sha`: String. If the recipe is under version control, it SHOULD be the full commit hash.
  Otherwise, it SHOULD be an empty string.
* `remote_url`: String. If the recipe is under version control, it SHOULD be the CVS URL of the
  recipe repository being built. HTTP(S) is preferred.
* `flow_run_id`: String. It SHOULD be an unambiguous identifier for the pipeline run that produced
  the artifact. It tends to adopt the following syntax: `{ci-provider}_{run-id}`. Depending on the CI platform, this may be obtained through different means. For example:
    * AppVeyor on Windows: `appveyor_${APPVEYOR_BUILD_ID}`.
    * Azure DevOps Pipelines: `azure_$(Build.BuildNumber).$(System.JobAttempt)`. Note this is using
      Azure Pipelines' macros instead of environment variables.
    * Circle CI: `circle_${CIRCLE_WORKFLOW_ID}`.
    * Drone CI: `drone_${DRONE_BUILD_NUMBER}`.
    * GitHub Actions: `github_${GITHUB_RUN_ID}`.
    * Travis CI: `travis_${TRAVIS_JOB_ID}`.

These keys are usually stored in the [`info/about.json` metadata file](./info.md), under the `extra` key.

## History

- 2026-03-04: [CEP 31](/learn/ceps/cep-0031/) is approved to standardize build provenance metadata.
