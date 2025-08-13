export default function domainCheck(domain: string) {
    const validDomains = [
        /^https:\/\/cbd\.int$/,                         // cbd.int
        /^https:\/\/.*\.cbd\.int$/,                     // *.cbd.int
        /^https:\/\/cbddev\.xyz$/,                      // cbddev.xyz
        /^https:\/\/.*\.cbddev\.xyz$/,                  // *.cbddev.xyz
        /^https:\/\/biosafetyclearinghouse\.net$/,      // biosafetyclearinghouse.net
        /^https:\/\/.*\.biosafetyclearinghouse\.net$/,  // *.biosafetyclearinghouse.net
        /^https:\/\/biosafetyclearinghouse\.org$/,      // biosafetyclearinghouse.org
        /^https:\/\/.*\.biosafetyclearinghouse\.org$/,  // *.biosafetyclearinghouse.org
        /^https:\/\/chm-cbd\.net$/,                     // chm-cbd.net
        /^https:\/\/.*\.chm-cbd\.net$/,                 // *.chm-cbd.net
        /^https:\/\/kronos-events\.net$/,               // kronos-events.net
        /^https:\/\/.*\.kronos-events\.net$/,           // *.kronos-events.net
        /^https:\/\/kronosevents\.net$/,                // kronosevents.net
        /^https:\/\/.*\.kronosevents\.net$/,            // *.kronosevents.net
        /^http:\/\/localhost:\d+$/                      // localhost with any port (development)
    ];

    return validDomains.some(pattern => pattern.test(domain));
}