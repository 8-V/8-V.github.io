layout = $('#layout')
$.ajax('/hw/list.json', {
    complete: (xhr, stat) => {
        if (stat != 'success') {
            console.error(stat);
            return;
        }
        list_of_predmets = JSON.parse(xhr.responseText);
        console.log(list_of_predmets)
        $.ajax('/card.tmp', {
            complete: (xhr, stat) => {
                if (stat != 'success') {
                    console.error(stat);
                    return;
                }
                template = xhr.responseText;
                for (var i = list_of_predmets.length - 1; i >= 0; i--) {
                    window.p = list_of_predmets[i];
                    $.ajax('/hw/' + window.p + '/desc', {
                        complete: (xhr, stat) => {
                            if (stat != 'success') {
                                console.error(stat)
                                return
                            }
                            description = xhr.responseText
                            $.ajax('/hw/' + window.p + '/name', {
                                complete: (xhr, stat) => {
                                    if (stat != 'success') {
                                        console.error(stat)
                                        return
                                    }
                                    name = xhr.responseText
                                    card = template.replace('TYPE', window.p).replace('TEXT', description).replace('TITLE', name)
                                    layout.append(card)
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})
