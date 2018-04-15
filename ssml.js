// Copyright 2017, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Utility class to create SSML responses
 */

const SSML = class {
  constructor () {
    this.tags = [];
  }

  // Say prompt
  say (value) {
    if (value) {
      this.tags.push(this.escape(value));
    }
    return this;
  }

  // Audio tag
  audio (url, description) {
    if (url) {
      if (description) {
        this.tags.push(`<audio src='${url}'><sub alias='${this.escape(description)} sound'>&#x1f50a;</sub></audio>`);
      } else {
        this.tags.push(`<audio src='${url}'/>`);
      }
    }
    return this;
  }

  // Break tag
  pause (duration) {
    if (duration) {
      this.tags.push(`<break time='${duration}'/>`);
    }
    return this;
  }

  // Date
  date (date) {
    if (date) {
      this.tags.push(`<say-as interpret-as="date" format="yyyymmdd" detail="2">` + date + `</say-as>`);
    }
    return this;
  }
  
  // Time
  time (time) {
    if (time) {
      this.tags.push(`<say-as interpret-as="time" format="hms24" detail="1">` + time + `</say-as>`);
    }
    return this;
  }

  // Convert to string
  toString () {
    return `<speak>${this.tags.join(' ')}</speak>`;
  }

  escape (value) {
    if (value && typeof (value) === 'string') {
      return value.replace(/&/g, '&amp;');
    }
    return value;
  }
};

module.exports = {
  SSML: SSML
};