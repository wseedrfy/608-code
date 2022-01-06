p = ["view",  "navigator" ,"scroll-view", "label" ,"form" ,"span", "switch", "picker", "cover-view", "map"]

p1 = ["image", "text", "input" ,  "block" ,  "button", "cover-image"  ]

b = ''

html = ""
for  index, b in enumerate(p) :

    for i in range(1,10):
        html += '''
    <template name="test-''' + b +  str(i) + '''">
    <'''+b+''' data-index={{item.data-index}} style="{{item.style}}" class="{{item.class}}" catchtap="{{ item.bindtap == 'undefined'?'':item.bindtap}}">
        <text>{{item.text}}</text>
        <block wx:for="{{item.children}}" wx:for-item="childrenItem">
        <template is="{{ 'test-'+childrenItem.type+(deep+1) }}" data="{{ item:childrenItem, deep:deep+1 }}"></template>
        </block>
    </'''+b+'''>
    </template>
    '''

for  index, b in enumerate(p1) :

    for i in range(1,10):
        html += '''
    <template name="test-''' + b +  str(i) + '''">
        <'''+b+''' data-index={{item.data-index}} src="{{item.src}}" style="{{item.style}}" class="{{item.class}}" catchtap="{{ item.bindtap == 'undefined'?'':item.bindtap}}">
            <text>{{item.text}}</text>
        </'''+b+'''>
    </template>
    '''

print(html)

f = "lucky.html"


with open(f,"w") as f:   #”w"代表着每次运行都覆盖内容

    f.write(html)
